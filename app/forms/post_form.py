from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, URL


class PostForm(FlaskForm):
    product_name = StringField("product name", validators=[
                               DataRequired(message='Please enter a product name')])
    price = FloatField("price", validators=[DataRequired(
        message="please enter a valid amount")])
