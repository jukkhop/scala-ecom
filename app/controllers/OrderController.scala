package controllers

import javax.inject._

import play.api._
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc._

import slick.driver.PostgresDriver.simple._

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class OrderController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def index(id: Int) = Action { request =>
    val product = orderProduct(id)
    Ok(product)
  }

  val connectionUrl = s"jdbc:postgresql://localhost:5432/ecom_db?user=ecom_user&password=ecom_user_password"

  def orderProduct(id: Int): JsValue = {
    Database.forURL(connectionUrl, driver = "org.postgresql.Driver") withSession {
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
