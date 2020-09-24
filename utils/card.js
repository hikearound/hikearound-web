import { colors } from '../constants/colors';

export function getDifficultyColor(label) {
    const pillColors = {
        easy: colors.green,
        moderate: colors.blue,
        difficult: colors.red,
    };

    return pillColors[label.toLowerCase()];
}

export default getDifficultyColor;
