
from flask_login import login_required, current_user
from flask import Blueprint, request
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.review_form import ReviewForm
from app.models import db, Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/', methods=["POST"])
@login_required
def add_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post_id = request.json['post_id']
    print('request.json', request.json)
    if form.validate_on_submit():
        data = form.data
        new_review = Review(
            user_id=current_user.id,
            post_id=post_id,
            star_rating=data["star_rating"],
            content=data["content"]
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>/', methods=["PATCH"])
@login_required
def patch_post(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)
        data = form.data
        review.edit_content(data['content'])
        review.edit_rating(data['star_rating'])
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>/', methods=["DELETE"])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if current_user.id != review.user_id:
        return {"hello": "there"}
    db.session.delete(review)
    db.session.commit()

    return {"Message": "Review deleted successfully"}
