from app.models import db, Review


def seed_reviews():
    review1 = Review(user_id="1", post_id="2",
                     content="I like my beans to be green")
    review2 = Review(user_id="1", post_id="3", content="mmmm beans")
    review3 = Review(user_id="2", post_id="1",
                     content="I paid $4.04 and got NOTHING! what a ripoff")
    review4 = Review(user_id="2", post_id="3",
                     content="yuck! 0/10 never again")
    review5 = Review(user_id="3", post_id="1", content="Where's my beans???")
    review6 = Review(user_id="3", post_id="4",
                     content="Are these really even beans?")
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
