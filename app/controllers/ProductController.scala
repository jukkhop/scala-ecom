package controllers

import javax.inject._

import play.api._
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc._

import slick.driver.PostgresDriver.simple._

case class Product(
  id: Int,
  title: String,
  desc: String,
  image: String,
  stock: Int,
  price: Float
)

// Matches schema of the database table
class Products(tag: Tag) extends Table[Product](tag, "products") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def title = column[String]("title")
  def desc = column[String]("desc")
  def image = column[String]("image")
  def stock = column[Int]("stock")
  def price = column[Float]("price")
  def * = (id, title, desc, image, stock, price) <> (Product.tupled, Product.unapply)
}

/**
  * Controller for /api/product routes
  */
@Singleton
class ProductController @Inject()(config: Configuration, cc: ControllerComponents) extends AbstractController(cc) {

  val DB_URL = config.get[String]("db.default.url")
  val DB_DRIVER = config.get[String]("db.default.driver")

  def getAll() = Action { request =>
    Ok(getProducts())
  }

  def getOne(id: Int) = Action { request =>
    getProduct(id) match {
      case Some(product) => Ok(product)
      case None => NotFound(s"Product with id $id not found")
    }
  }

  def add() = Action { request =>
    val product = Json.fromJson[Product](request.body.asJson.get).get
    val id = addProduct(product)
    Ok(s"Successfully added product with id $id")
  }

  def replace() = Action { request =>
    val product = Json.fromJson[Product](request.body.asJson.get).get
    updateProduct(product)
    Ok("Successfully updated product")
  }

  def delete(id: Int) = Action { request =>
    deleteProduct(id)
    Ok(s"Successfully deleted product $id")
  }

  def getProducts(): JsValue = {
    Database.forURL(DB_URL, driver = DB_DRIVER) withSession {
      implicit session =>
        val products = TableQuery[Products]
        Json.toJson(products.list.sortBy(_.id))
    }
  }

  def getProduct(id: Int): Option[JsValue] = {
    Database.forURL(DB_URL, driver = DB_DRIVER) withSession {
      implicit session =>
        val products = TableQuery[Products]
        val result = products.filter(_.id === id).take(1).list
        result match {
          case Nil => None
          case list => Some(Json.toJson(list.head))
        }
    }
  }

  def addProduct(product: Product): Int = {
     Database.forURL(DB_URL, driver = DB_DRIVER) withSession {
      implicit session =>
        val products = TableQuery[Products]
        products += product
        products.sortBy(_.id.desc).take(1).list.head.id
    }
  }

  def updateProduct(product: Product) = {
     Database.forURL(DB_URL, driver = DB_DRIVER) withSession {
      implicit session =>
        val products = TableQuery[Products]
        products.filter(_.id === product.id).update(product)
    }
  }

  def deleteProduct(id: Int) = {
     Database.forURL(DB_URL, driver = DB_DRIVER) withSession {
      implicit session =>
        val products = TableQuery[Products]
        products.filter(_.id === id).delete
    }
  }

  implicit val productWrites = new Writes[Product] {
    def writes(product: Product) = Json.obj(
      "id" -> product.id,
      "title" -> product.title,
      "desc" -> product.desc,
      "image" -> product.image,
      "stock" -> product.stock,
      "price" -> product.price
    )
  }

  implicit val productReads: Reads[Product] = (
    (__ \ "id").read[Int] and
      (__ \ "title").read[String] and
      (__ \ "desc").read[String] and
      (__ \ "image").read[String] and
      (__ \ "stock").read[Int] and
      (__ \ "price").read[Float]
    )(Product.apply _)
}
