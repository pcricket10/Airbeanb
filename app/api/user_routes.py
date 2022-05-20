from app.models import Post, User
from flask import Blueprint
from flask_login import login_required

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/posts')
@login_required
def user_photos(id):
    posts = Post.query.filter_by(user_id=id)
    print("\n\n\n\n\nhi hi hi\n\n\n\n\n")
    return {"posts": [post.to_dict() for post in posts]}
