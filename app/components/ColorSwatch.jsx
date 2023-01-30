import { useState } from 'react';
import styles from './ColorSwatch.module.css'

export default function ColorSwatch({ color, palette, addToPalette, copy = false }) {
    const [selected, Select] = useState(false);
    return (
        <div className={selected ? styles.swatchsel : styles.swatch} style={{ background: color }} onClick={() => { clickHandle(color, copy, palette, addToPalette, selected, Select) }}>{color}</div>
    )
}

function clickHandle(color, copy, palette, setPalette, selected, Select) {
    if (copy) {
        navigator.clipboard.writeText(color)
    } else {
        var pal = [...palette[0]]
        if (pal[0] === "N") {
            pal=[]
        }
        if (selected) {
            pal.splice(pal.indexOf(color), 1)
        } else {
            pal.push(color)
        }
        setPalette(pal)
        Select(current => !current)
    }
}