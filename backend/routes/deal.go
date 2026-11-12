package routes

import (
	"fmt"
	"github.com/Keith1039/foptimize/schema"
	"github.com/Keith1039/zflights/client"
	"github.com/Keith1039/zflights/geo"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

// for now
var id = 1

type GeoDeals struct {
	Deals []GeoDeal
}
type GeoDeal struct {
	Latlng [2]float64 `json:"latlng"`
	schema.Deal
}

func transformDealsToGeoDeals(deals []schema.Deal) []GeoDeal {
	// initially empty
	// we're doing best effort since some obscure city might be missing so append logic runs
	geoDeals := make([]GeoDeal, 0)
	for _, deal := range deals {
		latlng, err := geo.GetLatLng(deal.Country, deal.Name)
		if err != nil {
			fmt.Printf("Error getting latlng for country %s, skipping...\n", err)
			continue
		}
		geoDeals = append(geoDeals, GeoDeal{Latlng: latlng, Deal: deal})
	}
	return geoDeals
}

func HandleGetDeals(c *gin.Context) {
	ctx := c.Request.Context()
	deals, err := client.Client.GetUserDeals(ctx, id)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	c.JSON(200, GeoDeals{Deals: transformDealsToGeoDeals(deals)})
}

type paginatedReq struct {
	Limit  int `form:"limit" binding:"required,min=1"`
	Offset int `form:"offset,default=0" binding:"gte=0"`
}

func HandleGetRecommendations(c *gin.Context) {
	ctx := c.Request.Context()
	reqStruct := paginatedReq{}
	err := c.ShouldBindWith(&reqStruct, binding.Query)
	if err != nil {
		c.JSON(400, gin.H{
			"err": err.Error(),
		})
		return
	}
	deals, err := client.Client.GetNonUserDeals(ctx, id, reqStruct.Limit, reqStruct.Offset)
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return
	}
	c.JSON(200, GeoDeals{Deals: transformDealsToGeoDeals(deals)})
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
