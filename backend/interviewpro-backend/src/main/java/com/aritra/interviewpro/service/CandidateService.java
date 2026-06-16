package com.aritra.interviewpro.service;

import com.aritra.interviewpro.dto.CandidateRequestDto;
import com.aritra.interviewpro.dto.CandidateResponseDto;
import com.aritra.interviewpro.entity.Candidate;
import com.aritra.interviewpro.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;

    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public CandidateResponseDto saveCandidate(
            CandidateRequestDto requestDto
    ) {

        Candidate candidate = new Candidate();

        candidate.setName(requestDto.getName());
        candidate.setEmail(requestDto.getEmail());
        candidate.setPhone(requestDto.getPhone());
        candidate.setCollege(requestDto.getCollege());
        candidate.setSkills(requestDto.getSkills());

        Candidate savedCandidate =
                candidateRepository.save(candidate);

        return CandidateResponseDto.builder()
                .id(savedCandidate.getId())
                .name(savedCandidate.getName())
                .email(savedCandidate.getEmail())
                .phone(savedCandidate.getPhone())
                .college(savedCandidate.getCollege())
                .skills(savedCandidate.getSkills())
                .build();
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found"));
    }
}