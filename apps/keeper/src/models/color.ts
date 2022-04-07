import { Health } from './health'

enum ColorEnum {
    LOW = '#ffd666',
    NORMAL = '#95de64',
    EXCELLENT = '#52c41a',
    HIGH = '#ff7875',
    TOO_HIGH = '#f5222d'
}

const getColorFn = (
    critical: number[],
    colors: ColorEnum[],
    evaluation: string[],
    val: number
) => {
    if (
        evaluation.length !== colors.length ||
        critical.length + 1 !== evaluation.length
    ) {
        throw new Error(
            `Can't invoke function getColorFn, because the config is invalid.`
        )
    }
    let res: { color: ColorEnum; evaluation: string } = {
        color: ColorEnum.NORMAL,
        evaluation: ''
    }
    critical.forEach((c, index) => {
        if (res.evaluation) return
        if (val < c) {
            res = { color: colors[index], evaluation: evaluation[index] }
        }
    })
    return res.evaluation
        ? res
        : {
              color: colors[colors.length - 1],
              evaluation: evaluation[evaluation.length - 1]
          }
}

export type TipKey = keyof Omit<
    Health,
    'id' | 'name' | 'date' | 'weight' | 'score'
>

export const tips: Record<
    TipKey,
    {
        description: string
        getColor?: (val: number) => { color: ColorEnum; evaluation: string }
    }
> = {
    bmi: {
        description:
            'BMI（Body Mass Index）即人体健康指数，是国际组织衡量人体胖瘦程以及是否健康的指标，BMI 不直接测量身体脂肪含量，但研究表明其与人体脂肪含量具有相关性。',
        getColor: (val: number) =>
            getColorFn(
                [18.5, 23.9, 27.9],
                [
                    ColorEnum.LOW,
                    ColorEnum.NORMAL,
                    ColorEnum.HIGH,
                    ColorEnum.TOO_HIGH
                ],
                ['偏瘦', '标准', '偏胖', '肥胖'],
                val
            )
    },
    bodyFatRate: {
        description:
            '体脂率是指人体内脂肪重量在人体总体重中所占的比例，又称体脂百分数。身体水分的丢失，也会造成体重下降，体脂率的升高，所以短期内体脂率的大幅波动，多因体重变化导致。',
        getColor: (val: number) =>
            getColorFn(
                [11.0, 22.0, 27.0],
                [
                    ColorEnum.LOW,
                    ColorEnum.NORMAL,
                    ColorEnum.HIGH,
                    ColorEnum.TOO_HIGH
                ],
                ['偏瘦', '标准', '偏胖', '肥胖'],
                val
            )
    },
    bodyAge: {
        description:
            '身体年龄是以基础代谢率为参考而研究出的身体年龄倾向，是综合评价身体状况的重要标准，',
        getColor: (val: number) =>
            getColorFn(
                [28, 29],
                [ColorEnum.NORMAL, ColorEnum.EXCELLENT, ColorEnum.HIGH],
                ['年轻', '正常', '偏大'],
                val
            )
    },
    muscle: {
        description:
            '肌肉量是指肌肉在身体成分中所占的重量，肌肉量与体质、年龄、运动量等多种因素有关。',
        getColor: (val: number) =>
            getColorFn(
                [49.5, 59.4],
                [ColorEnum.LOW, ColorEnum.NORMAL, ColorEnum.EXCELLENT],
                ['不足', '标准', '优秀'],
                val
            )
    },
    boneMass: {
        description:
            '骨量是指单位体积内骨组织，骨矿物质（钙、磷等）和骨基质（骨胶原、蛋白质、无机盐等等）含量。体脂秤是利用生物电阻抗，通过对身体成分的推算而算得的骨量值，仅作参考，不作临床诊断使用。',
        getColor: (val: number) =>
            getColorFn(
                [3.2],
                [ColorEnum.HIGH, ColorEnum.NORMAL],
                ['不足', '标准'],
                val
            )
    },
    water: {
        description:
            '水分率是体内液体总量占体重的百分比，水分在体内担负着调节体温、搬运营养物质和代谢废物、调节体内环境的重任。保持健康的水分比例能够确保身体功能高效，并降低发生相关健康问题的风险。',
        getColor: (val: number) =>
            getColorFn(
                [53.0, 67.0],
                [ColorEnum.LOW, ColorEnum.NORMAL, ColorEnum.HIGH],
                ['偏低', '标准', '偏高'],
                val
            )
    },
    visceralFat: {
        description:
            '内脏脂肪是指围绕在内脏器官周围的脂肪，对内脏器官起到保护作用。但当内脏脂肪过多时，会造成腹型肥胖，增加脂肪肝、糖尿病、高血压等疾病的发病风险。',
        getColor: (val: number) =>
            getColorFn(
                [10, 15],
                [ColorEnum.NORMAL, ColorEnum.HIGH, ColorEnum.TOO_HIGH],
                ['标准', '偏高', '过高'],
                val
            )
    },
    bmr: {
        description:
            '基础代谢指人体在安静和恒温条件下，禁食12小时后，静卧、放松而又清醒时的能量消耗。体脂秤所测得的基础代谢是根据身体成分对基础代谢的一个推算值，仅做参考。',
        getColor: (val: number) =>
            getColorFn(
                [1773],
                [ColorEnum.LOW, ColorEnum.NORMAL],
                ['偏低', '达标'],
                val
            )
    },
    protein: {
        description:
            '蛋白质率是指身体内的蛋白质水平标准。体脂秤所测得的蛋白质率是根据身体成分对此的一个推算值，仅做参考。',
        getColor: (val: number) =>
            getColorFn(
                [16.0, 20.0],
                [ColorEnum.LOW, ColorEnum.NORMAL, ColorEnum.HIGH],
                ['不足', '标准', '偏高'],
                val
            )
    },
    subcutaneousFat: {
        description:
            '通过测量皮下脂肪的厚度，不仅可以判断人体的胖瘦情况，还可以用所测的皮脂厚度推测全身脂肪的重量，评价人体组成的比例。',
        getColor: (val: number) =>
            getColorFn(
                [8.6, 20.7],
                [ColorEnum.LOW, ColorEnum.NORMAL, ColorEnum.HIGH],
                ['偏瘦', '标准', '偏高'],
                val
            )
    },
    weightWithoutFat: {
        description:
            '去脂体重又称瘦体重，是指除脂肪以外身体其他成分的重量，肌肉是其中的主要部分。去脂体重高说明身体强壮体质好，如运动员或一些平时就注重锻炼身体的人，他们肌肉强健，虽然体重高但却并不肥胖'
    },
    skeletalMuscleRate: {
        description: '人体有多个肌肉组织，其中骨骼肌是通过锻炼增加的肌肉。',
        getColor: (val: number) =>
            getColorFn(
                [40.0, 60.0],
                [ColorEnum.LOW, ColorEnum.NORMAL, ColorEnum.HIGH],
                ['偏低', '标准', '偏高'],
                val
            )
    }
}
