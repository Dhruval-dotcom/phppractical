<?php

$page_name = $_POST['pagename'];
$val_from = $_POST['valfrom'];
$val_to = $_POST['valto'];
$unit_from = $_POST['unitfrom'];
$unit_to = $_POST['unitto'];

function check_key($arr,$key){
    return array_key_exists($key,$arr)==true?$arr[$key]:'error';
}

class conversion {
    function convert($pagename,$valfrom,$valto,$unitfrom,$unitto){
       // try{
            switch ($pagename) {
                case "distance":
                    $val = $valfrom;
                    $distancemeter = [
                        'm' => $val * 1,
                        'km' => $val * 1000,
                        'cm' => $val / 100,
                        'mm' => $val / 1000,
                        'mcm' => $val / 1000000,
                        'nm' => $val / 1000000000,
                        'mile' => $val / 0.0006213689,
                        'yard' => $val / 1.0936132983,
                        'foot' => $val / 3.280839895,
                        'inch' => $val / 39.37007874
                    ];
                
                    $value = $distancemeter[$unitfrom];    # ------------Converting any kind of input to meter
                    $distancetarget = [
                        'm' => $value * 1,
                        'km' => $value / 1000,
                        'cm' => $value * 100,
                        'mm' => $value * 1000,
                        'mcm' => $value * 1000000,
                        'nm' => $value * 1000000000,
                        'mile' => $value * 0.0006213689,
                        'yard' => $value * 1.0936132983,
                        'foot' => $value * 3.280839895,
                        'inch' => $value * 39.37007874
                    ];
                    echo $distancetarget[$unitto];        # ------------Converting that meter value to target value
                    break;
                
                case "area":
                    $val = $valfrom;
                    $area_square_meter = [
                        'sqm' => $val * 1,
                        'sqkm' => $val * 1000000,
                        'sqcm' => $val / 10000,
                        'sqmm' => $val / 1000000,
                        'hec' => $val * 10000,
                        'yard' => $val * 0.83612736,
                        'sqft' => $val * 0.09290304,
                        'sqinch' => $val * 0.00064516,
                        'acre' => $val * 4046.8564224
                    ];
            
                    $value = $area_square_meter[$unitfrom];  # ------------Converting any kind of input to square meter
                    $areatarget = [
                        'sqm' => $value * 1,
                        'sqkm' => $value / 1000000,
                        'sqcm' => $value * 10000,
                        'sqmm' => $value * 1000000,
                        'hec' => $value / 10000,
                        'yard' => $value / 0.83612736,
                        'sqft' => $value / 0.09290304,
                        'sqinch' => $value / 0.00064516,
                        'acre' => $value / 4046.8564224
                    ];
                    echo $areatarget[$unitto];              # ------------Converting that square meter value to target value
                    break;
            
                case "volume":
                    $val = $valfrom;
                    $volume_cube_meter = [
                        'm3' => $val * 1,
                        'km3' => $val * 1000000000,
                        'cm3' => $val / 1000000,
                        'mm3' => $val / 1000000000,
                        'l' => $val * 0.001,
                        'ml' => $val * 0.000001,
                        'gallon' => $val * 0.00378541
                    ];
            
                    $value = $volume_cube_meter[$unitfrom]; # ------------Converting any kind of input to cubic meter
                    $volumetarget = [
                        'm3' => $value,
                        'km3' => $value / 1000000000,
                        'cm3' => $value * 1000000,
                        'mm3' => $value * 1000000000,
                        'l' => $value / 0.001,
                        'ml' => $value / 0.000001,
                        'gallon' => $value / 0.00378541
                    ];
                    echo $volumetarget[$unitto];           # ------------Converting that cubic meter value to target value
                    break;
            
                case "mass":
                    $val = $valfrom;
                    $mass_gram = [
                        'kg' => $val * 1000,
                        'gm' => $val,
                        'mgm' => $val / 1000,
                        'ton' => $val * 1000000,
                        'pound' => $val * 453.592,
                        'carrat' => $val * 0.2
                    ];
            
                    $value = $mass_gram[$unitfrom];      # ------------Converting any kind of input to gram
                    $masstarget = [
                        'kg' => $value / 1000,
                        'gm' => $value,
                        'mgm' => $value * 1000,
                        'ton' => $value / 1000000,
                        'pound' => $value / 453.592,
                        'carrat' => $value / 0.2
                    ];
                    echo $masstarget[$unitto];           # ------------Converting that gram value to target value
                    break;
            
                case "speed":
                    $val = $valfrom;
                    $speed_mps = [
                        'mps' => $val ,
                        'fps' => $val * 0.3048,
                        'kmph' => $val * 0.2777778,
                        'mph' => $val * 0.44704
                    ];
            
                    $value = $speed_mps[$unitfrom];      # ------------Converting any kind of input to meter per second
                    $speedtarget = [
                        'fps' => $value / 0.3048,
                        'mps' => $value ,
                        'kmph' => $value / 0.2777778,
                        'mph' => $value / 0.44704
                    ];
                    echo $speedtarget[$unitto];          # ------------Converting that meter per second value to target value
                    break;
            
                case "temp":
                    $val = $valfrom;
                    $temp_celcius = [
                        'celcius' => $val,
                        'kelvin' => $val - 273.15,
                        'fr' => (5/9) * ($val - 32)
                    ];
            
                    $value = $temp_celcius[$unitfrom];  # ------------Converting any kind of input to celcius
                    $temptarget = [
                        'celcius' => $value,
                        'kelvin' => $value + 273.15,
                        'fr' => (9/5 * $value) + 32
                    ];
                    echo $temptarget[$unitto];         # ------------Converting that celcius value to target value
                    break;
            }        
    //     }
    //     catch (Exception $e) {  
    //         echo '</br> <b> Exception Message: ' .$e->getMessage() .'</b>';  
    //     }  
    }
}

$obj_conversion = new conversion();
$obj_conversion -> convert($page_name,$val_from,$val_to,$unit_from,$unit_to);