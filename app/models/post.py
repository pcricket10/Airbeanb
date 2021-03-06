from datetime import datetime
from .db import db


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    product_name = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    created_at = db.Column(
        db.DateTime(), default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow,
                           onupdate=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_name': self.product_name,
            'location': self.location,
            'img_url': self.img_url,
            'price': self.price,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.users.to_dict()
            # 'reviews': self.reviews.to_dict()
        }

    def edit_product_name(self, product_name):
        self.product_name = product_name
        return product_name

    def edit_price(self, price):
        self.price = price
        return price

    def edit_img_url(self, img_url):
        self.img_url = img_url
        return img_url

    def edit_location(self, location):
        self.location = location

    users = db.relationship("User", back_populates="posts")
    reviews = db.relationship(
        "Review", back_populates="posts", cascade="all, delete")
