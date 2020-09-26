import { colors } from '../constants/colors';

export function getDifficultyColor(label) {
    const pillColors = {
        easy: colors.green,
        moderate: colors.blue,
        difficult: colors.blueDark,
    };

    return pillColors[label.toLowerCase()];
}

export default getDifficultyColor;
