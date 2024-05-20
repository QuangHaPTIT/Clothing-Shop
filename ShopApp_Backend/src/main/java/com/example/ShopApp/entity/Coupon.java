package com.example.ShopApp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name = "coupons")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @Column(name = "active")
    private boolean active;

    @OneToMany(mappedBy = "coupon", fetch = FetchType.LAZY)
    private List<CouponCondition> couponConditions;

    @OneToMany(mappedBy = "coupon", fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy = "coupon", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;
}
