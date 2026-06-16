package com.aritra.interviewpro.service;
import com.aritra.interviewpro.exception.CandidateNotFoundException;
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
    public CandidateResponseDto updateCandidate(
            Long id,
            CandidateRequestDto requestDto
    ) {

        Candidate candidate = candidateRepository
                .findById(id)
                .orElseThrow(() ->
                        new CandidateNotFoundException(
                                "Candidate not found"));

        candidate.setName(requestDto.getName());
        candidate.setEmail(requestDto.getEmail());
        candidate.setPhone(requestDto.getPhone());
        candidate.setCollege(requestDto.getCollege());
        candidate.setSkills(requestDto.getSkills());

        Candidate updatedCandidate =
                candidateRepository.save(candidate);

        return CandidateResponseDto.builder()
                .id(updatedCandidate.getId())
                .name(updatedCandidate.getName())
                .email(updatedCandidate.getEmail())
                .phone(updatedCandidate.getPhone())
                .college(updatedCandidate.getCollege())
                .skills(updatedCandidate.getSkills())
                .build();
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() ->
                        new CandidateNotFoundException("Candidate not found"));
    }
    public void deleteCandidate(Long id) {

        Candidate candidate = candidateRepository
                .findById(id)
                .orElseThrow(() ->
                        new CandidateNotFoundException(
                                "Candidate not found"));

        candidateRepository.delete(candidate);
    }
}