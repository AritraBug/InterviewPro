package com.aritra.interviewpro.service;
import java.util.List;
import com.aritra.interviewpro.entity.Candidate;
import com.aritra.interviewpro.repository.CandidateRepository;
import org.springframework.stereotype.Service;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;

    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public Candidate saveCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }
}