*** Settings ***
Documentation     A test suite for valid login.
Default Tags      positive

*** Test Cases ***
Login User with Password
    ${params}    Create Dictionary    keya=1.1.1.1    keyb=xun
    编辑虚拟机    ${params}

*** Keywords ***
编辑虚拟机
    [Arguments]    ${params}
    # 获取虚拟机并检查返回值
    ${vm_dict}    Create Dictionary    keya=test1    keyb=tew    keyc=sfs
    
    # 检查 params 是否为空
    log to console    params:${params}
    Length Should Be    ${params}    0    "Params dictionary is empty"
    
    # 定义所有需要的键
    ${key_list}    Create List    keya    keyb    keyc
    
    FOR    ${key}    IN    @{key_list}
        # 检查 param 中是否存在该键，并从 vm_dict 或 params 中获取对应的值
        ${value}    Set Variable If    '${key}' in '${params}'    ${params.get(${key}, '')}    ELSE    ${vm_dict.get(${key}, '')}
        Log    Key: ${key}, Value: ${value}
    END