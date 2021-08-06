<?php

function queryParam($type, $value){
    if(strtolower($type) === 'string'){
        return checkString($value);

    }else if(strtolower($type) === 'integer'){
        return checkInteger($value);

    }else if(strtolower($type) === 'datetime' ){
        return checkDatetime($value);

    }else if(strtolower($type) === 'bit' ){
        return checkBit($value);

    }else if(strtolower($type) === 'char' ){
        return checkChar($value);

    }else{
            return null;
        }
    }

function checkString($value){
    $myValue = "";
    if(is_string($value)){
        $myValue = strval($value);
    }else{
        $myValue = "";
    }
    return $myValue;
}

function checkInteger($value){
    $myValue = 0;
    if(is_numeric($value)){
        $myValue = $value;
    }else{
        $myValue = 0;
    }
    return $myValue;
}

function checkDatetime($value){
    $myValue = null;
    if(strtotime($value)){
        $myValue = $value;
    }else{
        $myValue = null;
    }
    return $myValue;
}

function checkBit($value){
    $myValue = null;
    
    if($value === 1 or $value === 0){
        $myValue = $value;
    }else{
        $myValue = null;
    }
    return $myValue;
}

function checkChar($value){
    $myValue = null;

    if(strlen(is_string($value)) === 1){
        $myValue = strval($value);
    }else{
        $myValue = "";
    }
    return $myValue;
}
?>