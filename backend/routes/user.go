package routes

import (
	"github.com/Keith1039/zflights/client"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

type generalConfig struct {
	Threshold           int      `json:"threshold" binding:"required,min=10,max=100"`
	InterestedCountries []string `json:"interested_countries" binding:"required"`
	DepartureAirports   []string `json:"departure_airports" binding:"required,max=3"`
}

type emailConfig struct {
	Subscribed bool   `json:"subscribed" binding:"required"`
	BatchType  string `json:"batch_type" binding:"required"`
}

func HandleUpdateGeneralConfig(c *gin.Context) {
	ctx := c.Request.Context()
	reqStruct := generalConfig{}
	err := c.ShouldBindWith(&reqStruct, binding.JSON)
	if err != nil {
		c.JSON(400, gin.H{
			"err": err.Error(),
		})
		return
	}

	user, err := client.Client.GetUser(ctx, id)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	user.Threshold = reqStruct.Threshold
	user.RelevantAirports = reqStruct.DepartureAirports
	user.SubscribedCountries = reqStruct.InterestedCountries
	err = client.Client.UpdateUser(ctx, user)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	c.String(200, "successfully updated general settings")
}

func HandleUpdateEmailConfig(c *gin.Context) {
	ctx := c.Request.Context()
	reqStruct := emailConfig{}
	err := c.MustBindWith(&reqStruct, binding.JSON)
	if err != nil {
		c.JSON(400, gin.H{
			"err": err.Error(),
		})
		return
	}
	user, err := client.Client.GetUser(ctx, id)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	user.EmailConfig.Subscribed = reqStruct.Subscribed
	user.EmailConfig.BatchType = reqStruct.BatchType
	err = client.Client.UpdateUser(ctx, user)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	c.String(200, "successfully updated email settings")
}
