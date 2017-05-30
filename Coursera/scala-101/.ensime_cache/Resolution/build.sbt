
import sbt._
import IO._
import java.io._

scalaVersion := "2.10.6"

ivyScala := ivyScala.value map { _.copy(overrideScalaVersion = true) }

// we don't need jcenter, so this speeds up resolution
fullResolvers -= Resolver.jcenterRepo

// allows local builds of scala
resolvers += Resolver.mavenLocal

// for java support
resolvers += "NetBeans" at "http://bits.netbeans.org/nexus/content/groups/netbeans"

// this is where the ensime-server snapshots are hosted
resolvers += Resolver.sonatypeRepo("snapshots")

libraryDependencies += "org.ensime" %% "ensime" % "0.9.10-SNAPSHOT"

dependencyOverrides ++= Set(
   "org.scala-lang" % "scala-compiler" % scalaVersion.value,
   "org.scala-lang" % "scala-library" % scalaVersion.value,
   "org.scala-lang" % "scala-reflect" % scalaVersion.value,
   "org.scala-lang" % "scalap" % scalaVersion.value
)
val saveClasspathTask = TaskKey[Unit]("saveClasspath", "Save the classpath to a file")
saveClasspathTask := {
   val managed = (managedClasspath in Runtime).value.map(_.data.getAbsolutePath)
   val unmanaged = (unmanagedClasspath in Runtime).value.map(_.data.getAbsolutePath)
   val out = file("/home/scips/Workspace/sandbox/Coursera/scala-101/.ensime_cache/Resolution/classpath")
   write(out, (unmanaged ++ managed).mkString(File.pathSeparator))
}
