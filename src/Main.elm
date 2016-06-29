port module Main exposing (..)

import Html exposing (..)
import Html.App
import Debug

main =
  Html.App.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

type alias Model = String

type Msg = NoOp | Log String | Alert

init : (Model, Cmd Msg)
init = (toString 1, Cmd.none)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Alert ->
      (model, alert model)
    Log text ->
      (text , Cmd.none)
    _ ->
      (model, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
  log Log

view : Model -> Html Msg
view model =
  let
    _ =
      Debug.log "model" model
  in
    div []
      [ span [] [ text model ]
      , span [] [ text "Hentais" ]
      , span [] [ text "Hentais 2" ]
      ]

port alert : String -> Cmd msg
port log : (String -> msg) -> Sub msg
      
