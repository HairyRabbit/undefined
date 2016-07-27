module Util.Style exposing (..)

styleUnitNumber : String -> number -> String
styleUnitNumber unit value =
  value ++ unit

toPx =
  styleUnitNumber "px"

toRem =
  styleUnitNumber "rem"

toEm =
  styleUnitNumber "em"

toPrecentage =
  styleUnitNumber "%"

floatToPrecentage : number -> String
floatToPrecentage value
  toPrecentage (value * 100)
