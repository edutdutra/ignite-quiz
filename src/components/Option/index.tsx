import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {styles} from './styles';
import {BlurMask, Canvas, Circle, Path, runTiming, Skia, useValue, Easing} from "@shopify/react-native-skia";
import {THEME} from "../../styles/theme";
import {useEffect} from "react";

type Props = TouchableOpacityProps & {
    checked: boolean;
    title: string;
}

const CHECK_SIZE = 28;
const CHECK_STROKE = 2;
const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2;
const CENTER_CIRCLE = RADIUS / 2;

export function Option({checked, title, ...rest}: Props) {
    const percentage = useValue(0);
    const circle = useValue(0);
    const path = Skia.Path.Make();

    path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS)


    useEffect(() => {
        if (checked) {
            runTiming(percentage, 1, {duration: 700})
            runTiming(circle, CENTER_CIRCLE, {easing: Easing.bounce})
        } else {
            runTiming(percentage, 0, {duration: 700})
            runTiming(circle, 0, {duration: 300})
        }
    }, [checked]);

    return (
        <TouchableOpacity
            style={
                [
                    styles.container,
                    checked && styles.checked
                ]
            }
            {...rest}
        >
            <Text style={styles.title}>
                {title}
            </Text>
            <Canvas style={{height: CHECK_SIZE * 2, width: CHECK_SIZE * 2}}>
                <Path
                    path={path}
                    start={0}
                    end={1}
                    color={THEME.COLORS.GREY_500}
                    style="stroke"
                    strokeWidth={CHECK_STROKE}
                />

                <Path
                    path={path}
                    start={0}
                    end={percentage}
                    color={THEME.COLORS.BRAND_LIGHT}
                    style="stroke"
                    strokeWidth={CHECK_STROKE}
                >
                    <BlurMask style="solid" blur={1} />
                </Path>

                <Circle
                    r={circle}
                    cx={CHECK_SIZE}
                    cy={CHECK_SIZE}
                    color={THEME.COLORS.BRAND_LIGHT}
                >
                    <BlurMask style="solid" blur={3} />
                </Circle>
            </Canvas>
        </TouchableOpacity>
    );
}