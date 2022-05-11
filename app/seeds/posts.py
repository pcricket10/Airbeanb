from app.models import db, Post


def seed_posts():
    post1 = Post(user_id="1", product_name="Beans Not Found", price=4.04)
    post2 = Post(user_id="2", product_name="Green Beans", price=5.00)
    post3 = Post(user_id="3", product_name="Lima Beans", price=19.95)
    post4 = Post(user_id="1", product_name="Jelly Beans", price=1.50)
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
