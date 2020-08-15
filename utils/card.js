import { colors } from '../constants/colors';

export function getDifficultyColor(label) {
    const pillColors = {
        easy: colors.green,
        moderate: colors.blue,
        hard: colors.red,
    };

    return pillColors[label.toLowerCase()];
}

export default getDifficultyColor;
