from datetime import datetime
from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(20480), nullable=False)
    created_at = db.Column(
        db.DateTime(), default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'user_id': self.user_id,
            'star_rating': self.star_rating,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def edit_content(self, content):
        self.content = content
        return content
    def edit_rating(self, star_rating):
        self.star_rating = star_rating
        return star_rating

    users = db.relationship("User", back_populates="reviews")
    posts = db.relationship(
        "Post", back_populates="reviews")
