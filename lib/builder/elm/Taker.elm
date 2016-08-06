port module Taker exposing (..)

import Debug
import Html exposing (Html, text)
import Html.App as App

main =
  App.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

type alias Model = String

type Msg
  = NoOp
  | Greet String


-- UPDATE

init : (Model, Cmd Msg)
init =
  ("Rabbit", setTaker "233")

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Greet s ->
      let
        _ =
          Debug.log "test" s
      in
        ("wtf", Cmd.none)
    _ ->
      (model, Cmd.none)


port setTaker : String -> Cmd msg
port getTaker : (String -> msg) -> Sub msg

-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch
    [ Sub.none
    , getTaker Greet
    ]



-- VIEW

view : Model -> Html Msg
view model =
  text "Rabbit"
