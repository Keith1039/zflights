package routes

import (
	"fmt"
	"github.com/Keith1039/foptimize/schema"
	"github.com/Keith1039/zflights/client"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

// for now
var id = 1

func HandleGetDeals(c *gin.Context) {
	ctx := c.Request.Context()
	deals, err := client.Client.GetUserDeals(ctx, id)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	c.JSON(200, schema.Deals{Deals: deals})
}

func HandleGetRecommendations(c *gin.Context) {
	ctx := c.Request.Context()
	deals, err := client.Client.GetNonUserDeals(ctx, id)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	c.JSON(200, schema.Deals{Deals: deals})
}

type associateDealStruct struct {
	DealId int `json:"deal_id" binding:"required"`
}

func HandleAssociateDeal(c *gin.Context) {
	ctx := c.Request.Context()
	reqStruct := associateDealStruct{}
	err := c.MustBindWith(&reqStruct, binding.JSON)
	if err != nil {
		c.JSON(400, gin.H{
			"err": err.Error(),
		})
		return
	}
	err = client.Client.MapUserAndDeal(ctx, nil, id, reqStruct.DealId)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	c.String(200, fmt.Sprintf("deal with id '%d' now associated with user of id '%d'", reqStruct.DealId, id))
}

type dissociateDealStruct struct {
	associateDealStruct
}

func HandleDissociateDeal(c *gin.Context) {
	ctx := c.Request.Context()
	reqStruct := dissociateDealStruct{}
	err := c.MustBindWith(&reqStruct, binding.JSON)
	if err != nil {
		c.JSON(400, gin.H{
			"err": err.Error(),
		})
		return
	}
	err = client.Client.RemoveDealAssociation(ctx, id, reqStruct.DealId)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	c.String(200, fmt.Sprintf("deal with id '%d' no longer associated with user of id '%d'", reqStruct.DealId, id))
}
