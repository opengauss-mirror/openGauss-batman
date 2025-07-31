/**
 * copyright owner or entity authorized by
 * Copyright 2017-2021 The Apache Software Foundation
 * Copyright 2017-2022 The Apache Software Foundation
 * Copyright (c) 2015-present; xuxueli.
 * (C) 2007 Free Software Foundation; Inc. <http: fsf.org >
 *
 */

package org.opengauss.batman.common;

/**
 * 常量
 *
 * @author Mark sunlightcs@gmail.com
 */
public class Const {
    /**
     * 超级管理员ID
     */
    public static final int SUPER_ADMIN = 1;
    /**
     * 当前页码
     */
    public static final String PAGE = "page";
    /**
     * 每页显示记录数
     */
    public static final String LIMIT = "limit";
    /**
     * 排序字段
     */
    public static final String ORDER_FIELD = "sidx";
    /**
     * 排序方式
     */
    public static final String ORDER = "order";
    /**
     * 升序
     */
    public static final String ASC = "asc";

    public static final String JOB_KEY = "JOB_PARAM_KEY";

    public static final String TASK_SUCCESS = "SUCCESS";

    public static final String TASK_FAILED = "FAILED";

    public static final String TASK_RUNNING = "RUNNING";

    public static final String LOGICAL_BACKUP = "logical";

    public static final String PHYSICAL_BACKUP = "physical";

    public static final String TASK_RESTORE = "restore";

    public static final String TASK_BACKUP = "backup";

    public static final String FULL_BACKUP = "full";

    public static final String INCREMENT_BACKUP = "increment";

    public static final String PHYSICAL_BACKUP_CMD = "gs_probackup";

    public static final int MILLIS_PER_SECOND = 1000;
}
