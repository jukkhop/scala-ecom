package controllers

import javax.inject._

import play.api._
import play.api.Configuration
import play.api.http.HttpErrorHandler
import play.api.mvc._

/**
  * Frontend controller managing all static resource associate routes.
  */
@Singleton
class FrontendController @Inject()(
  assets: Assets,
  errorHandler: HttpErrorHandler,
  config: Configuration,
  cc: ControllerComponents) extends AbstractController(cc) {

  def index: Action[AnyContent] = assets.at("index.html")

  def assetOrDefault(resource: String): Action[AnyContent] =
    if (resource.startsWith("api")) {
      Action.async(r => errorHandler.onClientError(r, NOT_FOUND, "Not found"))
    } else {
      if (resource.contains("."))
        assets.at(resource)
      else
        index
    }
}