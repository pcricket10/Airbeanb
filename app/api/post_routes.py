from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Review, User
from app.forms.post_form import PostForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def all_posts():
    # user = User.query.get(current_user.id)
    posts = Post.query.all()

    response = {"posts": [post.to_dict() for post in posts]}
    return jsonify(response)


# @post_routes.route('/')
# def user_posts():
#     user = User.query.get(current_user.id)
#     posts = user.posts
#     response = {"posts": [post.to_dict() for post in posts]}
#     return jsonify(response)

# TODO implement later


@post_routes.route('/<int:id>')
def get_post(id):
    post = Post.query.get(id)
    # reviews = Post.query.join(Review).filter(Review.post_id == id)
    # # print("\n\n\n\n\n\n\n\n\n", type(post), "\n\n\n\n\n\n\n\n\n")
    # response = {"reviews": [review.to_dict() for review in reviews]}
    # print("\n\n\n\n\n\n\n\n\n", response, "\n\n\n\n\n\n\n\n\n")

    return post.to_dict()


@post_routes.route('/<int:id>/reviews/')
def get_post_reviews(id):
    reviews = Review.query.join(Post).filter(Review.post_id == id)
    return {"reviews": [review.to_dict() for review in reviews]}


@post_routes.route('/', methods=["POST"])
@login_required
def add_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_post = Post(
            user_id=current_user.id,
            product_name=data["product_name"],
            price=data["price"],
            img_url=data["img_url"]
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403


@post_routes.route('/<int:id>/', methods=["PATCH"])
@login_required
def patch_post(id):
    post = Post.query.get(id)
    print("\n\n\n\n\n\n\nPOST\n\n\n\n\n", post)
    form = PostForm()
    data = form.data
    post.edit_product_name(data['product_name'])
    post.edit_price(data['price'])
    post.edit_img_url(data['img_url'])
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<int:id>/', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if current_user.id != post.user_id:
        return {"hello": "there"}
    db.session.delete(post)
    db.session.commit()
    return {"Message": "Post deleted successfully"}
