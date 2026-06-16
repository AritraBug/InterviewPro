package com.aritra.interviewpro.controller;

import com.aritra.interviewpro.entity.Candidate;
import com.aritra.interviewpro.service.CandidateService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.aritra.interviewpro.dto.CandidateRequestDto;
import com.aritra.interviewpro.dto.CandidateResponseDto;
import jakarta.validation.Valid;
import com.aritra.interviewpro.service.InterviewService;
import com.aritra.interviewpro.dto.InterviewResponseDto;
import org.springframework.data.domain.Page;
@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateService candidateService;
    private final InterviewService interviewService;

    public CandidateController(CandidateService candidateService, InterviewService interviewService) {
        this.candidateService = candidateService;
        this.interviewService = interviewService;
    }

    @PostMapping
    public CandidateResponseDto createCandidate(
            @Valid @RequestBody CandidateRequestDto requestDto
    ) {

        return candidateService.saveCandidate(requestDto);
    }
    @GetMapping("/{id}/interviews")
    public List<InterviewResponseDto> getCandidateInterviews(
            @PathVariable Long id
    ) {
        return interviewService
                .getInterviewsByCandidateId(id);
    }
    @GetMapping
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }
    @GetMapping("/{id}")
    public Candidate getCandidateById(@PathVariable Long id) {
        return candidateService.getCandidateById(id);
    }
    @PutMapping("/{id}")
    public CandidateResponseDto updateCandidate(
            @PathVariable Long id,
            @Valid @RequestBody CandidateRequestDto requestDto
    ) {

        return candidateService.updateCandidate(
                id,
                requestDto
        );
    }
    @DeleteMapping("/{id}")
    public void deleteCandidate(
            @PathVariable Long id
    ) {
        candidateService.deleteCandidate(id);
    }
    @GetMapping("/search")
    public List<Candidate> searchCandidates(
            @RequestParam String name
    ) {

        return candidateService
                .searchCandidatesByName(name);
    }
    @GetMapping("/paginated")
    public Page<Candidate> getCandidatesPaginated(
            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size
    ) {

        return candidateService
                .getCandidatesPaginated(
                        page,
                        size
                );
    }
}