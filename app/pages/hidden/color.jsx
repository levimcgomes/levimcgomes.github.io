import React, { useState } from 'react';
import Colorful from '@uiw/react-color-colorful';
import Hue from '@uiw/react-color-hue';
import { hexToHsva, hsvaToHex, rgbaStringToHsva, hsvaToRgbString } from '@uiw/color-convert'
import ColorSwatch from '../../components/ColorSwatch'
import ColorSwatchGroup from '../../components/ColorSwatchGroup'
import styles from './color.module.css'

const SVDefault = 100

export default function ColorPage() {
    const [hsva, setHsva] = useState({ h: 0, s: SVDefault, v: SVDefault, a: 1 });
    const [palette, setPalette] = useState(["NAC"])
    const [RGBHEX, setRGBHEX] = useState("")
    const handlePalette = (color) => {
        setPalette(current => [color])
    }
    return (
        <>
            <div style={{ padding: 10 }}></div>
            <ColorSwatchGroup colors={[...palette[0]]} direction="h" copy></ColorSwatchGroup>
            <input onKeyPress={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    setHsva({h: hexToHsva(e.target.value).h, s: SVDefault, v:SVDefault, a: 1})
                    console.log(e.target.value)
                    console.log(hsva)
                }
            }}/>
            &nbsp; &nbsp; &nbsp; CONVERT: <input onKeyPress={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    if (e.target.value.includes("#")) {
                        setRGBHEX(hsvaToRgbString(hexToHsva(e.target.value)))
                    } else {
                        setRGBHEX(hsvaToHex(rgbaStringToHsva("rgb("+e.target.value+")")))
                    }
                }
            }}/>
            &nbsp; =&nbsp; {RGBHEX}
            <Hue hue={hsva.h}
                onChange={(newHue) => {
                setHsva({ ...hsva, ...newHue });
                }} />
            <h3>Analogous</h3>
            <div className={styles.swatches}>
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetSaturationGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetValueGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroupInv({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
            </div>
            <h3>Complement</h3>
            <div className={styles.swatches}>
                {GetSimilarScheme({ h: GetComplementScheme(hsva), s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetSaturationGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetComplementScheme(hsva), s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetValueGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetComplementScheme(hsva), s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetComplementScheme(hsva), s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroupInv({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
            </div>
            <h3>Triadic</h3>
            <div className={styles.swatches}>
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetSaturationGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetValueGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroupInv({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
            </div>
            <div className={styles.swatches}>
                {GetSimilarScheme({ h: GetTriadicScheme(hsva)[0], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetSaturationGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTriadicScheme(hsva)[0], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetValueGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTriadicScheme(hsva)[0], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTriadicScheme(hsva)[0], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroupInv({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
            </div>
            <div className={styles.swatches}>
                {GetSimilarScheme({ h: GetTriadicScheme(hsva)[1], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetSaturationGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTriadicScheme(hsva)[1], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetValueGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTriadicScheme(hsva)[1], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTriadicScheme(hsva)[1], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroupInv({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
            </div>
            <h3>Tetradic</h3>
            <div className={styles.swatches}>
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetSaturationGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetValueGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme(hsva).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroupInv({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
            </div>
            <div className={styles.swatches}>
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[0], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetSaturationGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[0], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetValueGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[0], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[0], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroupInv({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
            </div>
            <div className={styles.swatches}>
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[1], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetSaturationGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[1], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetValueGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[1], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[1], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroupInv({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
            </div>
            <div className={styles.swatches}>
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[2], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetSaturationGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[2], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetValueGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[2], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroup({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
                {GetSimilarScheme({ h: GetTetradicScheme(hsva)[2], s: SVDefault, v: SVDefault, a: 1 }).map((hue) => (
                    <div className={styles.swatches}>
                        {GetToneGroupInv({ h: hue, s: SVDefault, v: SVDefault, a: 1 }, handlePalette, palette)}
                    </div>
                ))}
            </div>
        </>
    );
}

function GetSaturationGroup(hsva, setPalette, palette) {
    var tones = []
    for (var i = 0; i < 5; i++) {
        tones[i] = hsvaToHex({ h: hsva.h, s: ((4-i)+1) / 5 * 100, v: hsva.v, a: 100})
    }
    return (<ColorSwatchGroup colors={tones} addToPalette={setPalette} palette={palette}></ColorSwatchGroup>)
}

function GetValueGroup(hsva, setPalette, palette) {
    var tones = []
    for (var i = 0; i < 5; i++) {
        tones[i] = hsvaToHex({ h: hsva.h, s: hsva.s, v: ((4-i) + 1) / 5 * 100, a: 100 })
    }
    return (<ColorSwatchGroup colors={tones} addToPalette={setPalette} palette={palette}></ColorSwatchGroup>)
}

function GetToneGroup(hsva, setPalette, palette) {
    var tones = []
    for (var i = 0; i < 5; i++) {
        tones[i] = hsvaToHex({ h: hsva.h, s: ((4 - i) + 1) / 5 * 100, v: ((4 - i) + 1) / 5 * 100, a: 100 })
    }
    return (<ColorSwatchGroup colors={tones} addToPalette={setPalette} palette={palette}></ColorSwatchGroup>)
}
function GetToneGroupInv(hsva, setPalette, palette) {
    var tones = []
    for (var i = 0; i < 5; i++) {
        tones[i] = hsvaToHex({ h: hsva.h, s: ((i) + 1) / 5 * 100, v: ((4 - i) + 1) / 5 * 100, a: 100 })
    }
    return (<ColorSwatchGroup colors={tones} addToPalette={setPalette} palette={palette}></ColorSwatchGroup>)
}

function GetSimilarScheme(hsva) {
    var tones = []
    for (var i = 0; i < 5; i++) {
        var hh = hsva.h + (i - 2) / 5 * 100
        if (hh < 0) hh = 360 + hh
        tones[i] = hh
    }
    return tones
}

function GetComplementScheme(hsva) {
    var hh = hsva.h + 180
    if (hh < 0) hh = 360 + hh
    return hh
}

function GetTriadicScheme(hsva) {
    var tones = []
    var hh = hsva.h + 120
    if (hh < 0) hh = 360 + hh
    tones[0] = hh
    var hh = hh + 120
    if (hh < 0) hh = 360 + hh
    tones[1] = hh
    return tones
}

function GetTetradicScheme(hsva) {
    var tones = []
    var hh = hsva.h + 90
    if (hh < 0) hh = 360 + hh
    tones[0] = hh
    var hh = hh + 90
    if (hh < 0) hh = 360 + hh
    tones[1] = hh
    var hh = hh + 90
    if (hh < 0) hh = 360 + hh
    tones[2] = hh
    return tones
}