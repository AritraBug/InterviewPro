package com.aritra.interviewpro.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
@Entity
@Table(name = "candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phone;

    private String college;

    private String skills;
    @OneToMany(mappedBy = "candidate")
    private List<Interview> interviews;
}