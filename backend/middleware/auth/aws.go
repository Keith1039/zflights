package middleware

import "github.com/gin-gonic/gin"

type AwsAuthHandler struct {
}

func (handler *AwsAuthHandler) Authenticate() func(c *gin.Context) {
	return func(c *gin.Context) {

	}
}
