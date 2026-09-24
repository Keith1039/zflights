package middleware

import (
	"github.com/Keith1039/zflights/authenticator"
	"net/http"
)

type Auth struct {
	authenticator.Authenticator
}

func (a *Auth) Authenticate(req http.Request) error {

	return nil
}
