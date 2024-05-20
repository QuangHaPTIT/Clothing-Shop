package com.example.ShopApp.components.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

@Aspect
@Component
public class PerformanceAspect {
    private Logger logger = Logger.getLogger(getClass().getName());

    @Pointcut("within(com.example.ShopApp.controllers.*)")
    public void controllerMethods() {}

    @Before("controllerMethods()")
    public void beforeMethodExecution(JoinPoint joinPoint) {
        String methodName = this.getMethodName(joinPoint);
        logger.info("Starting execution of " + methodName);
    }

    @After("controllerMethods()")
    public void afterMethodExecution(JoinPoint joinPoint) {
        String methodName = this.getMethodName(joinPoint);
        logger.info("Finished execution of " + methodName);
    }

    @Around("controllerMethods()")
    public Object measureControllerMethodExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.nanoTime();
        Object returnValue = joinPoint.proceed();
        long end = System.nanoTime();
        String methodName = getMethodName(joinPoint);
        logger.info("Execution of " + methodName + " took " + TimeUnit.NANOSECONDS.toMillis(end - start) + " ms");
        return returnValue;
    }

    private String getMethodName(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        return methodName;
    }
}
