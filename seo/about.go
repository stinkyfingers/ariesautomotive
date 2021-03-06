package seo

import (
	"html/template"
	"net/http"
)

type AboutMatcher struct{}

func (am AboutMatcher) GetData(req *http.Request) Route {
	r := Route{}

	r.Name = "ARIES Automotive | About Us"
	r.Body = template.HTML("")
	r.Description = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle."
	r.Keywords = "aries, automotive, truck, suv, jeep, accessories, custom"

	return r
}
