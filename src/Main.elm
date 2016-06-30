--port module Main exposing (..)
{-
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
      

-}
port module Main exposing (..)


import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)
import Gif


main =
    App.program
        { init = init "funny cats" "funny dogs"
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { left : Gif.Model
    , right : Gif.Model
    }


init : String -> String -> ( Model, Cmd Msg )
init leftTopic rightTopic =
    let
        ( left, leftFx ) =
            Gif.init leftTopic

        ( right, rightFx ) =
            Gif.init rightTopic
    in
        ( Model left right
        , Cmd.batch
            [ Cmd.map Left leftFx
            , Cmd.map Right rightFx
            ]
        )



-- UPDATE


type Msg
    = Left Gif.Msg
    | Right Gif.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Left leftMsg ->
            let
                ( left, leftCmds ) =
                    Gif.update leftMsg model.left
            in
                ( Model left model.right
                , Cmd.map Left leftCmds
                )

        Right rightMsg ->
            let
                ( right, rightCmds ) =
                    Gif.update rightMsg model.right
            in
                ( Model model.left right
                , Cmd.map Right rightCmds
                )



-- VIEW


view : Model -> Html Msg
view model =
    div [ style [ ( "display", "flex" ) ] ]
        [ App.map Left (Gif.view model.left)
        , App.map Right (Gif.view model.right)
        ]



-- SUBS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Sub.map Left (Gif.subscriptions model.left)
        , Sub.map Right (Gif.subscriptions model.right)
        ]
        `always` Debug.log "model:" model
           
