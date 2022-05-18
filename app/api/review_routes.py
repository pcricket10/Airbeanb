from app.models import Post, Review, User
from flask_login import login_required, current_user
from flask import Blueprint, jsonify, request
from app.forms.review_form import ReviewForm
from app.models import db, Post, Review, User

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/', methods=["POST"])
@login_required
def add_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post_id = request.json["post_id"]
    if form.validate_on_submit():
        data = form.data
        new_review = Review(
            user_id=current_user.id,
            post_id=post_id,
            body=data["body"]
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    if form.errors:
        return form.errors, 403
