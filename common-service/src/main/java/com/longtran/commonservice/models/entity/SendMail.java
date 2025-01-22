package com.longtran.commonservice.models.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "send_mail")

public class SendMail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "send_mail_seq")
    @SequenceGenerator(name = "send_mail_seq", sequenceName = "SEND_MAIL_SEQ", allocationSize = 1)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Lob
    @Column(name = "content")
    private String content;

    @Column(name = "mail_to", length = 500)
    private String mailTo;

    @Column(name = "status")
    private Integer status;


}
