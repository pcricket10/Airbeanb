from flask import Flask
from flask_wtf import FlaskForm
from wtforms import TextAreaField, RadioField
from wtforms.validators import InputRequired, Length


class ReviewForm(FlaskForm):
    star_rating = RadioField("Rating", choices=[('5', '5 stars'), ('4', '4 stars'), ('3', '3 stars'), ('2', '2 stars'), ('1', '1 star')],
                             validators=[InputRequired(
                                 message='⚠️ Please provide a star rating')])
    content = TextAreaField("Review", validators=[
        InputRequired(message='⚠️ Please provide a review'),
        Length(min=4, max=20480, message="⚠️ The number of characters must be between 4 and 20,480 characters in length")])
