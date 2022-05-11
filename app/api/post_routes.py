from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Post, Review, User

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def posts():
    user = User.query.get(current_user.id)
    posts = user.posts
    response = {'posts': [post.to_dict() for post in posts]}
    return jsonify(response)


@post_routes.route('/<int:id>/')
def get_posts(id):
    post = Post.query.get(id)
    reviews = {"reviews": review.to_dict() for review in post.reviews}
    return jsonify(reviews)


# @post_routes.route('/', methods=["POST"])
# def post_photo():
#     form = PostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         data = form.data
#         new_photo = Photo(
#             user_id=current_user.id,
#             photo_url=data["photo_url"],
#             caption=data["caption"]
#         )
#         db.session.add(new_photo)
#         db.session.commit()
#         return new_photo.to_dict()

#     if form.errors:
#         return form.errors, 403
