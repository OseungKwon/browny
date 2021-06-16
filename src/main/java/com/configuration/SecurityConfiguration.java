package com.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

//	@Autowired
//	private MemberService memberService;

//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}

//	@Override
//	public void configure(WebSecurity web) throws Exception {
//		web.ignoring().antMatchers("/css/**","/js/**","/images/**","/img/**","/lib/**","/user/login");
//	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic().disable();
//		http.authorizeRequests()
//			.antMatchers("/**").permitAll()
//			.and()
//			.formLogin()
//			.loginPage("/user/login")
//			.defaultSuccessUrl("/")
//			.permitAll()
//			.and()
//			.logout()
//			.logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
//			.logoutSuccessUrl("/")
//			.invalidateHttpSession(true)
//			.and()
//			.exceptionHandling();
	}
	
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception{
//		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//	}
}