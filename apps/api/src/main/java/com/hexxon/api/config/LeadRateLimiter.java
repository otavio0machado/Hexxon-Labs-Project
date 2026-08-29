package com.hexxon.api.config;
import java.time.*; import java.util.*; import java.util.concurrent.*; import org.springframework.stereotype.Component;
/** Single-instance fallback. Replace with a distributed provider before horizontal scale. */
@Component public class LeadRateLimiter {
  private final Map<String, Deque<Instant>> attempts = new ConcurrentHashMap<>();
  public boolean allow(String key) { return allow(key, 5, Duration.ofMinutes(15)); }
  public boolean allow(String key, int limit, Duration duration) { Instant cutoff = Instant.now().minus(duration); Deque<Instant> window = attempts.computeIfAbsent(key, ignored -> new ConcurrentLinkedDeque<>()); synchronized (window) { while (!window.isEmpty() && window.peekFirst().isBefore(cutoff)) window.removeFirst(); if (window.size() >= limit) return false; window.addLast(Instant.now()); return true; } }
}
