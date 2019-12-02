name := """scala-ecom"""
organization := "com.purelogic"
maintainer := "jukka@purelogic.xyz"

version := "1.0"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.12"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.3" % Test

libraryDependencies ++= List(
  "org.postgresql" % "postgresql" % "9.3-1102-jdbc4",
  "com.typesafe.slick" %% "slick" % "2.1.0",
  "org.slf4j" % "slf4j-nop" % "1.6.4"
)

resolvers += ("typesafe" at "http://repo.typesafe.com/typesafe/releases/").withAllowInsecureProtocol(true)