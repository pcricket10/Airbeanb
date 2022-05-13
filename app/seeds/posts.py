from app.models import db, Post


def seed_posts():
    post1 = Post(user_id="1", product_name="Beans Not Found",
                 img_url="https://as2.ftcdn.net/v2/jpg/02/86/87/73/1000_F_286877335_qkqazGv9dQUL0rI6SgOszll0N1AFfp4L.jpg", price=4.04)
    post2 = Post(user_id="2", product_name="Green Beans",
                 img_url="https://thefamilydinnerproject.org/wp-content/uploads/2013/09/Green-bean-lime-633x326.jpg", price=5.00)
    post3 = Post(user_id="3", product_name="Lima Beans",
                 img_url="https://cdn.britannica.com/36/125436-004-FABACD88/Lima-beans.jpg?s=1500x700&q=85", price=19.95)
    post4 = Post(user_id="1", product_name="Jelly Beans",
                 img_url="https://upload.wikimedia.org/wikipedia/commons/1/14/JellyBellyBeans.jpg", price=1.50)
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
