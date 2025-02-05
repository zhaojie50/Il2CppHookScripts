import { getMethodDesFromMethodInfo as methodDEs } from "../bridge/fix/il2cppM"
import { formartClass } from "../utils/formart"

// 侧重参数信息 还有一个 MethodToShow() 用在 findMethod / find_method 侧重基本信息
export const showMethodInfo = (methodInfoPtr: NativePointer): void => {
    newLine()
    if (typeof methodInfoPtr == "number") methodInfoPtr = ptr(methodInfoPtr)
    let packMethod = new Il2Cpp.Method(methodInfoPtr)
    let params = packMethod.parameters.map((param: Il2Cpp.Parameter) => {
        return (`${getLine(8, ' ')}[-]${formartClass.alignStr(param.name)} | type: ${param.type.handle} | @ class:${param.type.class.handle} | ${param.type.name}`)
    }).join("\n")
    LOGZ(`[-]${packMethod.class.image.assembly.name} @ ${packMethod.class.image.assembly.handle}`)
    LOGZ(`${getLine(2, ' ')}[-]${packMethod.class.image.name} @ ${packMethod.class.image.handle} | C:${packMethod.class.image.classCount}`)
    LOGZ(`${getLine(4, ' ')}[-]${packMethod.class.name} @ ${packMethod.class.handle} | M:${packMethod.class.methods.length} | F:${packMethod.class.fields.length}`)
    LOGD(`${getLine(6, ' ')}[-]${methodDEs(packMethod)} @ MI:${packMethod.handle} & MP: ${packMethod.virtualAddress} ( ${packMethod.relativeVirtualAddress} ) `)
    LOGZ(`${params}`)
    newLine()
}

declare global {
    var showMethodInfo: (methodInfo: NativePointer) => void
}

globalThis.showMethodInfo = showMethodInfo