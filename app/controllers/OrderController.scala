package controllers

import javax.inject._

import play.api._
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc._

import slick.driver.PostgresDriver.simple._

/**
  * Controller for /api/order routes
  */
@Singleton
class OrderController @Inject()(config: Configuration, cc: ControllerComponents) extends AbstractController(cc) {

  val DB_URL = config.get[String]("db.default.url")
  val DB_DRIVER = config.get[String]("db.default.driver")

  def index(id: Int) = Action { request =>
    val product = orderProduct(id)
    Ok(product)
  }

  def orderProduct(id: Int): JsValue = {
    Database.forURL(DB_URL, driver = DB_DRIVER) withSession {
      implicit session =>
        val products = TableQuery[Products]
        val old = products.filter(_.id === id).list.head
        val column = for { x <- products if x.id === id } yield x.stock
        column.update(old.stock - 1)
        val updated = products.filter(_.id === id).list.head
        Json.toJson(updated)
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
}
