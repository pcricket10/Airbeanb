from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Post, Review, User

review_routes = Blueprint('reviews', __name__)


# @review_routes.route('/')
# def posts():
#     user = User.query.get(current_user.id)
#     reviews = user.reviews
#     return {'reviews': [review.to_dict() for review in reviews]}
