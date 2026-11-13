package main

import (
	"github.com/Keith1039/zflights/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"time"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	// deal routes
	router.GET("/deals", routes.HandleGetDeals)

	router.GET("/deals/recommend", routes.HandleGetRecommendations)

	router.POST("/deals/add", routes.HandleAssociateDeal)

	router.POST("/deals/delete", routes.HandleDissociateDeal)

	// user routes
	router.POST("/settings/general/update", routes.HandleUpdateGeneralConfig)

	router.POST("/settings/email/update", routes.HandleUpdateEmailConfig)

	err := router.Run(":8080")
	if err != nil {
		log.Fatal(err)
	}
}
