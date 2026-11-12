package main

import (
	"github.com/Keith1039/zflights/routes"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	router := gin.Default()

	// deal routes
	router.GET("/deals", routes.HandleGetDeals)

	router.GET("/deals/recommend", routes.HandleGetRecommendations)

	router.POST("/deals/add", routes.HandleAssociateDeal)

	router.POST("/deals/delete", routes.HandleDissociateDeal)

	// user routes
	router.POST("/settings/update/general", routes.HandleUpdateGeneralConfig)

	router.POST("/settings/update/email", routes.HandleUpdateEmailConfig)

	err := router.Run(":8080")
	if err != nil {
		log.Fatal(err)
	}
}
