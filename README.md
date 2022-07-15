The idea of this exam, website like Olex you can buy product and sell product and add products to his wishlist to buy it soon.
**create three collections   
1- User collection:
- firstName 
- lastName
- Email
- Password
- Profile_picture( allow more than one profile picture) 
- Cover_pictures
- Confirmed
- Blocked 
- WishList ( array of objectIds)
- IsDeleted
- Blocked
2- Product collection: 
- product_title
- Product_desc
- Product_price
- Qr_code 
- Likes( array of objectIds)
- CreatedBy ( ref to user model)
- Hidden 
- IsDeleted
- Comments ( array of objectIds ref to comment collection ) ( do this field of you relate product collection to comment collection by parent-child relationship ) 
- Wishlists ( array of objectIds ref to user collection) ( to which user’s wishlist this product added ) 
3- Comment collection: 
- comment_body
- comment_By (array of objectIds ref to user collection )
- Product_id (array of objectIds ref to product  collection ) 
- Replies ( array of objectIds ref to comment collection. ) 
**In General : 
Create pdf contain id,title,desc,price of every product created today and send this pdf ever day at 11:59:59 to the admin

**User APIs : 
- SignUp ( confirm email  , hash password before save to database ) 
- SignIn ( must check if this user’s email is confirmed , admin didn’t block him , user didn’t soft deleted ) 
- Update profile ( by account owner only ) ( if email updated must confirm it , password update must hashed before save in database)
- Delete user ( by admin and account owner ) 
- Add profile picture
- Add cover picture 
- Forget password 
- Soft delete ( by admin ) 
- Get all users with their product information , each product with its comments informations and  its wishlist array information , each comment with its replies if exist( apply pagination concept in this api ) 

**Product APIs:
- Add product ( create QR code for each product,  if there is a product added,  it must reflected in all pages which open the same wbsite in real time using sokect io ) 
- Update product ( by product owner only ) 
- Delete product ( by admin and product owner ) 
- Soft delete ( by admin and product owner ) 
- Like / unlike product 
- Add product to wishlist (this api will add the product to wishlist array in user collection  , if product already exists don’t add it again ) 
- Hide product 

**Comment APIs:
- Add comment ( if there is a comment added, it must reflected in all pages which open the same wbsite in real time using sokect io ) 
- Add reply in comment 
- Update comment ( by comment owner only )
- Delete comment ( by comment owner and product owner ) 
- Like/unlike comment 
