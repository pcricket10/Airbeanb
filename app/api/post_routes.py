from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Review, User
from app.forms.post_form import PostForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def posts():
    user = User.query.get(current_user.id)
    posts = user.posts
    response = {'posts': [post.to_dict() for post in posts]}
    return jsonify(response)


@post_routes.route('/<int:id>')
def get_reviews(id):
    post = Post.query.get(id)
    reviews = {"reviews": [review.to_dict() for review in post.reviews]}
    return jsonify(reviews)


@post_routes.route('/', methods=["POST"])
# @login_required
def add_post():
    # form = PostForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     # data = form.data
    #     new_post = Post(
    #         user_id=current_user.id,
    #         product_name=data["product_name"],
    #         price=data["price"]
    #     )
    new_post = Post(
        user_id=1,
        product_name=request.json['product_name'],
        price=request.json['price']
    )
    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict()

    if form.errors:
        return form.errors, 403
